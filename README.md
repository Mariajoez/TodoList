# TodoList
SET UP INSTRUCTION
1.Download node.js and supabase for the database and openAI API key for summarisation and slack workspace.
Then install the dependencies as
cd backend
npm install
2.Then get the environment variables for frontend and backend.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
3. Initialize Database
Make sure your SQL server is running. Then run migrations or sync your models.
4. Start Backend Server
bash
Copy
Edit
npm start

SLACK AND LLM SET UP GUIDANCE
To set up LLM , sign in to your OpenAI account and generate an API key. Add this key to your .env file. The backend supports models  and you can adjust the prompt used for summaries as needed.
For Slack integration, navigate to the Slack API page and create a new Incoming Webhook for the channel where you want summaries posted. Copy the generated webhook URL and paste it into your .env file.

DESIGN DECISIONS
This project was built with a focus on simplicity. the frontend focus and build by react for the better experience and the functionality such as Add, edit, delete to-do items.
View list of current to-dos.
A button to generate and send the summary.
Show a success/failure message for the Slack operation.
was done.
the backend was done by using nodejs and LLM and stack integration was done successfully.
