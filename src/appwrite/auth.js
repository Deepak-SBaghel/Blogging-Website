import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// to use method , therefore we created a variable of class
export class AuthService {
  client = new Client();
  account;

  // we want to set endpoint and project when the object is created
  // and not hardcode the value inside the client
  // HERE hardcoding = wasting resources

  // change  inside constructor if u change from appwrite
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // now we are creating the account
    this.account = new Account(this.client);
  }

  //  use any service but u will still need the same data(parameter)
  async createAccount({ email, password, name }) {
    // if u change from appwrite , change this
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        // redirect to login
        return this.login({ email, password });
      } else {
        return userAccount;
        // might be null
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      console.log("indide auth appwrite");
      return await this.account.createEmailPasswordSession(email, password);
      //Allow the user to login into their account by providing a valid email and password combination. This route will create a new session for the user.
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      console.log("error in getcurrentuser", await this.account.get());
       return await this.account.get();
      // returns an obj , have $id in it 
    } catch (error) {
      // work when gives , an error
      console.log("AppWrite service :: getCurrentUser :: error", error);
    }
    console.log("no error in getcurrentuser");
    return null;
    // if there no account with this , it will return nnull
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("AppWrite service :: logout :: error", error);
    }
  }
}

const authservice = new AuthService();

export default authservice;
