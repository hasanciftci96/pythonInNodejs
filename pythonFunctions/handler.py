# handler.py
import sys
import json
from dotenv import load_dotenv
from example import my_function
from another_example import another_example

load_dotenv()

FUNCTION_MAP = {
    'my_function': my_function,
    'another_example': another_example,
}

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    function_name = input_data['functionName']
    args = input_data['args']

    if function_name in FUNCTION_MAP:
        result = FUNCTION_MAP[function_name](*args)
        print(json.dumps({'result': result}))
    else:
        raise ValueError(f"Unknown function: {function_name}")
