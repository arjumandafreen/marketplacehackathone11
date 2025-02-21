import { createClient } from "next-sanity";

export const client = createClient({
  projectId: (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string)?.toLowerCase(), // Ensures lowercase
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", // Add default value if needed
  apiVersion: "2025-01-17",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});








// 
// import { createClient } from 'next-sanity'

//import { apiVersion, dataset, projectId } from '../env'

//export const client = createClient({
  //projectId,
  ////dataset,
  //apiVersion,
 // useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
//})
