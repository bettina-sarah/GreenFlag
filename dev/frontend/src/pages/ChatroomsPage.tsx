import React, {useEffect, useState } from 'react';
import Menu from '@/components/Menu';
import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";
import ChatroomItem from '@/components/ChatroomItem';

const ChatroomsPage: React.FC = () => {

	interface IProfileData {
		name: string;
		subject: {
			id:number;
			firstname:string;
			profile_photo: any;
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
	  } = useFetch<IProfileData[]>({
		url: "//get-chatrooms",
		data: { id: "1" },
	  });

	  const [modifiedProfileData, setModifiedProfileData] = useState<IProfileData[]>([]);
	  
	  useEffect(() => {
		if (profileData && !profileLoading && !profileError) {
			const updatedProfileData = [...profileData];
			console.log(updatedProfileData)
	  
			const fetchPhoto = async () => {
				try {
				  const updatedProfiles = await Promise.all(updatedProfileData.map(async (profile) => {
					const photoKey = profile.subject.profile_photo;
		
					// If there are photos, fetch them
					if (photoKey) {
					  const fetchedPhoto: IPhotoData = await fetchData<IPhotoData>("/get-photo", photoKey[0]);
					  profile.subject.profile_photo = fetchedPhoto; // Update profile photo data
					} else {
					  profile.subject.profile_photo = null; // No photos, set to null
					}
					return profile;
				  }));
		
				  setModifiedProfileData(updatedProfiles); // Update state with modified profiles
				} catch (error) {
				  console.error("Error fetching photos:", error);
				}
			};
			fetchPhoto();
			
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
			<div>
				{modifiedProfileData.map((profile) => (
					<ChatroomItem key={profile.name} name={profile.name} subject={profile.subject} last_message={profile.last_message} />
				))}
			</div>
		</div>
	);
	
}

	



export default ChatroomsPage;