async function getData(){
    const url = "https://jsonplaceholder.typicode.com/users";
    try{

const response = await fetch(url);
    const results = await response.json();

    if(!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    console.log(results);
}

    catch(error){
    console.log(error);
    }
}

getData();