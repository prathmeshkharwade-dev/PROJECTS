import axios from 'axios';

export const recommendCatTool = async (kidsFriendly: boolean,  apartmentFriendly: boolean) => {
    const res = await axios.post("http://localhost:3000/api/cats/recommend", {
        kidsFriendly,
        apartmentFriendly,
    });
    
        return res.data;
};



export const getAllCatTool = async () => {
    const res = await axios.get("http://localhost:3000/api/cats");
    
        return res.data;
};