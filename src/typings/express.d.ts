declare namespace Express {
  export interface Request {
    query: {
      lang?: string;
    };
  }
}





// declare global {
//   namespace Express {
//     interface Request {
//       query: {
//         lang?: string;
//       };
//     }

//     interface Response {
//       locals: {
//         lang: string;
//         getTranslation: (
//           referenceId: string,
//           referenceType: string
//         ) => Promise<{ [key: string]: string }>;
//       };
//     }
//   }
// }
