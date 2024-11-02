/** @type {import('next').NextConfig} */


const nextConfig = {
    images: {
        domains: [
            "files.edgestore.dev"
        ]
    }
};


// const nextConfig = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'https',
//           hostname: 'files.edgestore.dev',
//           pathname: '**',
//         },
//       ],
//     },
// };


export default nextConfig;

