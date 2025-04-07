import { blogSchema } from "./models/blog.model.js";
import { reactionSchema } from "./models/reaction.model.js";
import { userSchema } from "./models/user.model.js";


export function setupAssociations() {
    userSchema.hasMany(blogSchema, { foreignKey: 'auth' });
    blogSchema.belongsTo(userSchema, { foreignKey: 'auth' });

    userSchema.hasMany(reactionSchema, { foreignKey: 'userId' });
    reactionSchema.belongsTo(userSchema, { foreignKey: 'userId' });

    blogSchema.hasMany(reactionSchema, { foreignKey: 'blogId' });
    reactionSchema.belongsTo(blogSchema, { foreignKey: 'blogId' });
}


