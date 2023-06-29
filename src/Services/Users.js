import Parse from 'parse';

const getUsers = async() => {
    const User = Parse.Object.extend('User');
    const query = new Parse.Query(User);
      
    try {
        const users = await query.find();
        console.log('Users found:', users);
        return users;
    } catch (error) {
        console.error('Error while fetching users:', error);
    }
};
      

export default getUsers;