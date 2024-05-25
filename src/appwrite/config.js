import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;// to store posts , texts etc .
  bucket;// to store , file , images etc 
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    // now we are creating the account
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug, // refer to unique value
        {
          //data
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("AppWrite service :: updatePost :: error", error);
    }
  }

  async daletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite service :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("AppWrite service :: getPost :: error", error);
      return false;
    }
  }
  // u need a indexed value to add query
  async getPosts(queries = [Query.equal("statue","active")]){
    try {
        await this.databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          queries
        );
        return true;
      } catch (error) {
        console.log("AppWrite service :: getPosts :: error", error);
        return false;
      }
  }
  
  // upload file service 

  async uploadFile(file){
    try {
        return await this.bucket(
          conf.appwriteBucketId,
          ID.unique(),
          file
        );
      } catch (error) {
        console.log("AppWrite service :: uploadFile :: error", error);
        return false;
      }
  }
  async deleteFile(fileId){
    try{
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
    } catch(error){
        console.log("AppWrite service :: deleteFile :: error", error);
        return false;
    }
  }

  getFilePreview(fieldId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fieldId
    )
  }
}

const service = new Service();
export default Service;



// pagenation 
// compression