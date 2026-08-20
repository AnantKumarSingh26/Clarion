import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });


export const searchInternet = async ({query})=>{
    console.log('Search web via Tavily for: ', query)
    const response = await tvly.search(query,{
        searchDepth:"basic",
        maxResults:5,
    })
    return JSON.stringify(response.results || response);
}