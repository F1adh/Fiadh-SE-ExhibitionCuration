# Curiate

## Project Summary:
Curiate is a platform for users to curate personal collections of objects and artworks. Users may search through the collections of the Metropolitan Museum of Art and Havard Art Museums.

The goal of Curiate is to provide an application for researchers, students, and enthusiasts to discover objects and artworks that interest them, and to be able to connect with others in that pursuit.

## Hosted Version: [Curiate](https://curiate.netlify.app/)

## Built with:
React
Tanstack
TypeScript
Axios
Tailwind
Supabase


## Setup instructions:
Install Git on your local machine, if you haven't already. https://github.com/git-guides/install-git
On GitHub, navigate to the main repository page and click <>code. Copy the URL in the pop-up.
On a terminal on your machine, navigate to the folder you wish to clone the repo into.
On the terminal, type git clone [URL_HERE] followed by enter.
Navigate into the created folder.

Once you have navigated into the folder, enter the following commands on your terminal:
npm install - This will install the required dependencies to run the project
npm run dev - This will run the project on your local machine, which you can access through your web browser with the link provided by the terminal.

Please note: in order to have full functionality you will need to set up a .env file in the root directory. This is to store API keys necessary for the project:

VITE_HARVARD_API_KEY=[Your Harvard museum API Key]
VITE_SUPABASE_KEY=[Your Supabase API Key]

###Your API keys should never be exposed, so ensure that add .env to .gitignore to avoid accidentally publishing your keys.

the Harvard API key can be obtained from https://docs.google.com/forms/d/1Fe1H4nOhFkrLpaeBpLAnSrIMYvcAxnYWm0IU9a6IkFA/viewform
The Supabase key is for your database. This is where collections and collection objects are stored. At present, this is the structure of the database:

![database structure](/public/database_structure.PNG)

Please note that this is likely to change in the future. If you're having difficulty setting up a Supabase database, please contact me.