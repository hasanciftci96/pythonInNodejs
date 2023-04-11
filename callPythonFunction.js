const { spawn } = require("child_process")

function callPythonFunction(scriptPath, functionName, ...args) {
	return new Promise((resolve, reject) => {
		const input_data = {
			functionName,
			args,
		}

		const pythonProcess = spawn("python", [scriptPath, JSON.stringify(input_data)])

		pythonProcess.stdout.on("data", (data) => {
			try {
				const jsonData = JSON.parse(data)
				resolve(jsonData.result)
			} catch (err) {
				reject(err)
			}
		})

		pythonProcess.stderr.on("data", (data) => {
			console.error(`Error from Python: ${data}`)
			reject(new Error(data.toString()))
		})

		pythonProcess.on("close", (code) => {
			if (code !== 0) {
				reject(new Error(`Python process exited with code ${code}`))
			}
		})
	})
}

module.exports = { callPythonFunction }
