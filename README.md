# Raggable

As cool developers, we want to use the latest, coolest libraries. 

The purpose of this repo is to have LLM readable documentation for documentation that would not otherwise be accessible. 

## Using the repo

If you're using any of the major AI editors. You'll be able to have it read the documentation and produce updated code. 

The method I'm using is simply copying the documentation folder into the repo I'm using. 

## Contributing

1. Add a folder for the library if it does not exist. 
2. For each section of documentation create a markdown file. 
3. Using Developer Tools, copy the HTML of the documentation. 
4. Open https://aistudio.google.com/prompts/new_chat. 
5. Paste in the html along with this prompt below:
```
Give a thorough summary of the above documentation including examples all of the details and how use what is described. 
```
Give a thorough summary of the above documentation including examples all of the details and how use what is described. 

I've been using Gemini 2.0 model. 

6. Review the output, Add the output the neccesary file. 



If you notice some of the markdown is out of date or wrong please subject a pull request for the updated code. 