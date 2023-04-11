require("dotenv").config()
const express = require("express")
const app = express()
const createError = require("http-errors")
const logger = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const { callPythonFunction } = require("./callPythonFunction")

const PORT = process.env.PORT || 8080

//middleware
app.use(express.json())
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//Routes
app.get("/", (req, res) => {
	res.send("Hello World!")
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

const pythonCaller = async () => {
	const data1 = await callPythonFunction("pythonFunctions/handler.py", "my_function", 22, 4)
	const data2 = await callPythonFunction("pythonFunctions/handler.py", "another_example")

	console.log("python function 1:", data1)
	console.log("python function 2:", data2)
}

pythonCaller()

// error handler
app.use(function (err, req, res, next) {
	const isProduction = process.env.NODE_ENV === "production"
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = isProduction ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render("error")
})

app.disable("x-powered-by")

app.listen(PORT, () => console.log("Magic happening on PORT", +PORT))
