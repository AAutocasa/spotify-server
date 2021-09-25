import express from 'express'
import dotenv from 'dotenv'

import { MQTTManager, MQTTRouter, MQTTDefaultPublisherDelegate } from './mqtt';
import { AuthMiddleware, LoggerMiddleware } from './middlewares';
import { DeviceClassService, ThemeService } from './services';
import { FileDeviceClassDBManager, FileSavedThemeDBManager, RuntimeBaseThemeDBManager, RuntimeThemeToFunctionMap } from './data-access';

import { ThemeRouter, DeviceClassMQTTRouter } from './routes';

dotenv.config();

const app = express();
const router = express.Router();

// Setup middlewares
app.use(AuthMiddleware([process.env.API_KEY]))
app.use(LoggerMiddleware())

// Server setup
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/', router);

// MQTT Publisher setup
const publisher = new MQTTDefaultPublisherDelegate()

// Services setup
const savedThemeDBManager = new FileSavedThemeDBManager('./data/saved_themes.json');
const baseThemeDBManager = new RuntimeBaseThemeDBManager();
const themeToFunctionMap = new RuntimeThemeToFunctionMap();

const themeSvc = new ThemeService(savedThemeDBManager, baseThemeDBManager, themeToFunctionMap);

const deviceClassDBManager = new FileDeviceClassDBManager('./data/device_class.json');

const deviceClassSvc = new DeviceClassService(deviceClassDBManager, 60 * 60 * 1_000);

// HTTP Routes setup
ThemeRouter(router, themeSvc);

// MQTT Routes setup
const mqttRouter = new MQTTRouter();
DeviceClassMQTTRouter(mqttRouter, deviceClassSvc)

// MQTT setup
const mqttManager = new MQTTManager(mqttRouter,
                                    process.env.MQTT_HOST || 'localhost',
                                    process.env.MQTT_USERNAME,
                                    process.env.MQTT_PASSWORD);

// Sets the PublisherDelegate manager as the manager
publisher.mqttManager = mqttManager;

// Listen
app.listen(process.env.PORT, () => {
    console.log(`Server started running on ${process.env.PORT}`);
})