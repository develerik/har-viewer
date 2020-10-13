import { createApp } from "vue";

import "@openfonts/roboto_latin";
import "@mdi/font/css/materialdesignicons.min.css";

import "./styles/normalize.scss";
import "./styles/index.scss";
import App from "./App";

const app = createApp(App);

app.mount("#app");
