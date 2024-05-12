"use server";
import { connectToDB } from "./utils"
import {User} from "./models/user.model"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { Product } from "./models/product.model";
import { signIn } from "../auth";
export const addUser = async (formData) => {
  // with any server actions use server should been
  const {
    username,
    email,
    password,
    phone,
    address,
    isActive,
    isAdmin,
    img } = Object.fromEntries(formData);
  // // bellow useful
  // const data = Object.fromEntries(formData); 
  // Object.fromEntries will destructure our items in form data cause it object
  try {
    await connectToDB();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt )
    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      phone,
      address,
      isActive,
      isAdmin,
      img 
    });
    await newUser.save();

    
  } catch (error) {
    if (error.errors && error.errors.email) {
      throw new Error("Email not acceptable")
    }
  }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export const addProduct = async (formData) => {
  const {
      title,
      desc,
      price,
      stock,
      img,
      color,
      size} = Object.fromEntries(formData);
  try {
    await connectToDB();
    const newProduct = new Product({
      title,
      desc,
      price,
      stock,
      img,
      color,
      size
    });
    await newProduct.save();
  } catch (error) {
      throw new Error(`Failed to add product => ${error}`)
    
  }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();
    await Product.findByIdAndDelete(id);
  } catch (error) {
      throw new Error(`Failed to delete product => ${error}`)
    
  }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/products');
}
export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await connectToDB();
    await User.findByIdAndDelete(id);
  } catch (error) {
      throw new Error(`Failed to delete user => ${error}`)
    
  }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/users');
}

export const updateUser = async (formData) => {
  // with any server actions use server should been
  const {
    id,
    username,
    email,
    password,
    phone,
    address,
    isActive,
    isAdmin,
    img } = Object.fromEntries(formData);
  // // bellow useful
  // const data = Object.fromEntries(formData); 
  // Object.fromEntries will destructure our items in form data cause it object
  try {
    await connectToDB();
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isActive,
      isAdmin,
      img
    };
    /*
    // check if any fields empty do not update it
    Object.keys(updateFields).forEach(key => ((updateFields[key] === "" ) || (updateFields[key] === undefined)) && delete updateFields[key]);
    console.log(updateFields);
    const updated = await User.findByIdAndUpdate(id, updateFields, {
      new: true, // To return the updated document
      // Condition to update if the field value is not equal to the new value
      $or: [
        { isActive: { $ne: updateFields.isActive } },
        { isAdmin: { $ne: updateFields.isAdmin } }
      ]
    });
    console.log(updated);
  */
    
    // Retrieve the current document from the database
    const user = await User.findById(id);

    /*
    GPT code
    const isAnyOtherFieldEdited = Object.keys(updateFields).some(key => {
    return key !== 'isActive' && key !== 'isAdmin' && updateFields[key] !== user[key];
    });
    */
    // Check if any fields have been edited
    Object.keys(updateFields).forEach(key => {
      ((updateFields[key] === "") || (updateFields[key] === undefined)|| (updateFields[key].toString() === user[key].toString() )) && delete updateFields[key]
    });
    console.log(Object.keys(updateFields).length);

    if (Object.keys(updateFields).length > 0) {
      // Perform the update operation
      const updated = await User.findByIdAndUpdate(id, updateFields, { new: true });
      console.log(updated);
    } else {
      console.log("No fields other than isActive and isAdmin to update.");
    }
  } catch (error) {
    if (error.errors && error.errors.email) {
      throw new Error("Email not acceptable")
    } else {
      throw new Error(`Failed to update user => ${error}`)
      
    }
  }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}


export const updateProduct = async (formData) => {
  // with any server actions use server should been
  const {
      id,
      title,
      desc,
      price,
      stock,
      img,
      color,
      size} = Object.fromEntries(formData);
  try {
    await connectToDB();
    const updateFields = {
      title,
      desc,
      price,
      stock,
      img,
      color,
      size
    };
    const product = await Product.findById(id);
    Object.keys(updateFields).forEach(key => {
      ((updateFields[key] === "") || (updateFields[key] === undefined)|| (updateFields[key].toString() === product[key].toString() )) && delete updateFields[key]
    });
    console.log(Object.keys(updateFields).length);

    if (Object.keys(updateFields).length > 0) {
      const updated = await Product.updateOne({ _id: id }, updateFields);
      console.log(updated);
    } else {
      console.log("No fields  to update.");
    }
  } catch (error) {
      throw new Error(`Failed to update product => ${error}`)
    }
  // revalidatePath to refresh specific path
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export const authenticate = async (previousState, formData) => {
  // use previousState cause when make if use form state it will send the previousState also with form data

  const { username, password } = Object.fromEntries(formData);

  try {
    // inside signIn we write the provider name first
    await signIn("credentials", { username, password })
    
  } catch (error) {
    // console.log(error);
    // throw error;
    // make it return cause we now use it in client component so can return and catch the error there
    // return { error: "Wrong Credentials!!" };
    // with use form state be like bellow
    // return "Wrong Credentials!!!";

    if (error.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw error;
    
    
  }


}