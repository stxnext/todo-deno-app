**Deploy via github action**
1. Go to https://deno.com/deploy and Sign up/in
2. Select Github repository
3. Add Github Account
4. Choose single repo or all repos
5. Click again on Select Github repository
6. Your name or organization
7. Choose repo
8. Select Production branch
9. Select `main.ts` file
10. Change name but it need to be unique 
11. Link and after few sec we have working app which will update after push to repo

**Deploying you project from local**

1. Go to https://deno.com/deploy and Sign up/in
2. Click on your profile picture then "Access Tokens"
3. Create and copy access token
4. Go back to projects and create new project
5. Choose Empty Project
6. Copy name of your project
7. Use `deployctl deploy  --project=PROJECT_NAME --token=TOKEN --import-map=import_map.json src/index.ts`
8. Check returned url
9. If every thing is correct then use same command but add `--prod`
10. App is now deployed and eveyone can access it :D


**Endpoints**

GET /todos - list of all todos,
POST /todo {text:'todo'} - create todo,
PATCH /todo/:id - change todo's status
