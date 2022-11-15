const url = 'http://localhost:7071/api/'

const getInformationList = async () => {
    try {
        const response = await fetch(`${url}information-list`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*"
            }
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const submitInformation = async (data) => {
    try {
        const detail = {
            information: data
        }

        const params = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*"
            },
            body:  JSON.stringify(detail)
        }

        const response = await fetch(`${url}info`, params );

        return response
    } catch (err) {
        console.log(err);
    }
};

const editInformation = async (id, data) => {
    try {
        const detail = { 
            information: {...data, id }
        }

        const params = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': "*"
            },
            body:  JSON.stringify(detail)
        }

        const response = await fetch(`${url}information`, params );

        return response;
    } catch (err) {
        console.log(err);
    }
}

export { getInformationList, submitInformation, editInformation };