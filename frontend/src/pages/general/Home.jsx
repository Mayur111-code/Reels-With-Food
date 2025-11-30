// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import '../../styles/reels.css'
// import ReelFeed from '../../components/ReelFeed'

// const Home = () => {
//     const [ videos, setVideos ] = useState([])
//     // Autoplay behavior is handled inside ReelFeed

//     useEffect(() => {
//         axios.get("http://localhost:3000/api/food", { withCredentials: true })
//             .then(response => {

//                 console.log(response.data);

//                 setVideos(response.data.foodItems)
//             })
//             .catch(() => { /* noop: optionally handle error */ })
//     }, [])

//     // Using local refs within ReelFeed; keeping map here for dependency parity if needed

//     async function likeVideo(foodId) {
//     const response = await axios.post(
//         "http://localhost:3000/api/food/like",
//         { foodId },
//         { withCredentials: true }
//     );

//     if (response.data.like === true) {
//         setVideos(prev =>
//             prev.map(v => v._id === foodId ? { ...v, likeCount: v.likeCount + 1 } : v)
//         );
//     } else {
//         setVideos(prev =>
//             prev.map(v => v._id === foodId ? { ...v, likeCount: v.likeCount - 1 } : v)
//         );
//     }
// }

// async function saveVideo(foodId) {
//     const response = await axios.post(
//         "http://localhost:3000/api/food/save",
//         { foodId },
//         { withCredentials: true }
//     );

//     if (response.data.save === true) {
//         setVideos(prev =>
//             prev.map(v => v._id === foodId ? { ...v, savesCount: v.savesCount + 1 } : v)
//         );
//     } else {
//         setVideos(prev =>
//             prev.map(v => v._id === foodId ? { ...v, savesCount: v.savesCount - 1 } : v)
//         );
//     }
// }


//     return (
//         <ReelFeed
//             items={videos}
//             onLike={likeVideo}
//             onSave={saveVideo}
//             emptyMessage="No videos available."
//         />
//     )
// }

// export default Home




import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'

const Home = () => {
    const [ videos, setVideos ] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3000/api/food", { withCredentials: true })
            .then(response => {
                console.log(response.data);
                setVideos(response.data.foodItems || [])
            })
            .catch(err => {
                console.error("Failed to fetch videos:", err.response?.data || err.message)
            })
    }, [])

    async function likeVideo(foodId) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/food/like",
                { foodId },
                { withCredentials: true }
            );

            // backend should return { like: true } or { like: false }
            const liked = response.data.like === true

            setVideos(prev =>
                prev.map(v => {
                    if (v._id !== foodId) return v
                    const current = v.likeCount || 0
                    return { ...v, likeCount: liked ? current + 1 : Math.max(0, current - 1) }
                })
            );

        } catch (err) {
            console.error("LIKE ERROR:", err.response?.data || err.message)
        }
    }

    async function saveVideo(foodId) {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/food/save",
                { foodId },
                { withCredentials: true }
            );

            const saved = response.data.save === true

            setVideos(prev =>
                prev.map(v => {
                    if (v._id !== foodId) return v
                    const current = v.savesCount || 0
                    return { ...v, savesCount: saved ? current + 1 : Math.max(0, current - 1) }
                })
            );

        } catch (err) {
            console.error("SAVE ERROR:", err.response?.data || err.message)
        }
    }

    return (
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
    )
}

export default Home
