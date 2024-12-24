# Raggable


## Introduction

As cool developers, we want to use the latest, coolest libraries. And these nice libraries are changing faster than LLM knowledge cutoff dates. It may be a great code-producing LLM but if the knowledge cutoff date is before the updated code, the LLM will generate the wrong, outdated code. 

The purpose of this repo is to have LLM readable documentation for documentation that would not otherwise be accessible. 

There isn't much here right now but as I continue to use gen AI more and more in my code, the more I will be contributing to this repo. 

## Using the repo

If you're using any of the major AI editors. You'll be able to have it read the documentation and produce updated code. 

The most straightward method simply copying the documentation folder into the repo of your application and ask the AI to look at it in your prompt. There are more clever ways to do this but I won't discuss that here. 

## Contributing

1. Add a folder for the library if it does not exist. 
2. For each section of documentation create a markdown file. 
3. Using Developer Tools, copy the HTML of the documentation. 
4. Open https://aistudio.google.com/prompts/new_chat. 
5. Paste in the html along with this prompt below:
```
Give a thorough summary of the above documentation including examples all of the details and how use what is described. 
```

I've been using Gemini 2.0 Preview model with good results. 

6. Review the output, Add the output the neccesary file. 

## Other Notes

If you notice some of the markdown is out of date or wrong please subject a pull request for the updated code. 
