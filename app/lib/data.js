import { User } from "./models/user.model"
import { Product } from "./models/product.model";
import { connectToDB } from "./utils";



export const fetchUsers = async (q,page) => {
  const regex = new RegExp(q, "i");
  // how many user i wanna to see per page
  const ITEM_PER_PAGE = 10;
  try {
    await connectToDB();
    // another query to take count of user and it less expensive cause it take just count
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({
      username:{$regex:regex}
    }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
    return {users ,count};
    
  } catch (error) {
    // in production this not useful clear it and handle it without user know what error just you can in logs
    throw new Error (`Failed to fetch users => ${error}`)
    
  }
}

export const fetchSingleUsers = async (id) => {
  try {
    await connectToDB();
    // another query to take count of user and it less expensive cause it take just count
  
    const user = await User.findById(id)
    return user;
    
  } catch (error) {
    // in production this not useful clear it and handle it without user know what error just you can in logs
    throw new Error (`Failed to fetch single user => ${error}`)
    
  }
}

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");
  // how many user i wanna to see per page
  const ITEM_PER_PAGE = 10;
  try {
    await connectToDB();
    // another query to take count of user and it less expensive cause it take just count
    const countProduct = await Product.find({ title: { $regex: regex } }).count();
    const products = await Product.find({
      title:{$regex:regex}
    }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page-1));
    return {products ,countProduct};
    
  } catch (error) {
    // in production this not useful clear it and handle it without user know what error just you can in logs
    throw new Error (`Failed to fetch products => ${error}`)
    
  }
}

export const fetchSingleProduct = async (id) => {
  try {
    await connectToDB();
    // another query to take count of user and it less expensive cause it take just count
  
    const product = await Product.findById(id)
    return product;
    
  } catch (error) {
    // in production this not useful clear it and handle it without user know what error just you can in logs
    throw new Error (`Failed to fetch single product => ${error}`)
    
  }
}