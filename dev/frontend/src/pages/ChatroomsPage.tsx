import React, {useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";

const ChatroomsPage: React.FC = () => {

	interface IProfileData {
		name: string;
		subject: {
			id:number;
			firstname:string;
			profile_photo:any;
		};
		last_message: {
			sender_id: number;
			sender_first_name: string;
			content: string;
			date_sent: string;
		};
	  }

	  interface IPhotoData {
		path: string;
		key: string;
	  }

	const {
		data: profileData,
		loading: profileLoading,
		error: profileError,
	  } = useFetch<IProfileData>({
		url: "//get-chatrooms",
		data: { id: "1" },
	  });
	  const [photoData, setPhotoData] = useState<IPhotoData[]>([]);

	  
	  useEffect(() => {
		if (profileData && !profileLoading && !profileError) {
		  const photoKeys = profileData[1];
	
		  // Fetch all photos based on photo keys
		  const fetchPhotos = async () => {
			try {
			  //Promise.all ensures that all the promises (in this case, each fetchData call for each key) are resolved before it moves to the next line.
			  //This means that once all the photo fetches are completed, the resulting array of fetched photos will be passed into setPhotoData.
			  const fetchedPhotos: IPhotoData[] = await Promise.all(
				photoKeys.map(async (key: string) => {
				  const photo = await fetchData<IPhotoData>("/get-photo", key);
				  return {
					key,
					data: photo.path, // Assuming photo.path is a URL or Base64 string
				  };
				})
			  );
			  setPhotoData(fetchedPhotos);
			} catch (error) {
			  console.error("Error fetching photos:", error);
			}
		  };
	
		  fetchPhotos();
		}
	  }, [profileData, profileLoading, profileError]);
	
	  if (!profileData && profileLoading) {
		return <div>Loading...</div>;
	  }
	
	  if (!profileData && !profileLoading && profileError) {
		return (
		  <div>
			<div>Error: {profileError}</div>
		  </div>
		);
	  }


	return(
		<div>
			<Menu />
			

		</div>
	);
	
}

	



export default ChatroomsPage;