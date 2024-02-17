const winston = require("winston");

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "warn";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.colorize({
    message: false,
  }),
  winston.format.printf(
    (info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
);

const plainFormat = winston.format.printf(
  (info: any) => `[${info.timestamp}] ${info.level}: ${info.message}`
);

const transports = [
  new winston.transports.Console(),

  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    timestamp: true,
    maxsize: 1000000,
    format: plainFormat,
  }),
  // new winston.transports.File({ filename: "logs/all.log" }),
];
const exceptionHandlers = [
  new winston.transports.File({
    filename: "logs/exceptions.log",
    timestamp: true,
    maxsize: 1000000,
    format: plainFormat,
  }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  //   format: winston.format.cli(),
  format,
  transports:
    process.env.NODE_ENV === "production" ? transports : [transports[0]],
  exceptionHandlers:
    process.env.NODE_ENV === "production" ? exceptionHandlers : [],
  exitOnError: false,
});

export default logger;
