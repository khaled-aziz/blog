import express from 'express'
import { userSchema } from './database/models/user.model.js';
import { userRouter } from './src/modules/user/user.router.js';
import { blogRouter } from './src/modules/blog/blog.router.js';
import { blogSchema } from './database/models/blog.model.js';
import { reactionSchema } from './database/models/reaction.model.js';
import { setupAssociations } from './database/associations.js';



const app = express();
const port = 3000;
userSchema.sync()
blogSchema.sync()
reactionSchema.sync()

setupAssociations();

app.use(express.json());
app.use('/user', userRouter);
app.use('/blog', blogRouter);


app.listen(port,()=>{
    console.log(`server is running on port: ${port} ...👍`);
})
