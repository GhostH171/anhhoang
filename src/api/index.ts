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

export { getInformationList };