import React, { useEffect, useState } from "react";
import Menu from "@/components/menu_components/Menu";
import useFetch from "@/api/useFetch";
import fetchData from "@/api/fetchData";
import ChatroomItem from "@/components/ChatroomItem";
import { Spinner } from "flowbite-react";
import { NotificationProvider } from "@/components/NotificationContext";


interface IProfileData {
  name: string;
  subject: {
    id:number;
    firstname:string;
    profile_photo: any; // string | IPhotoData | null;
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

const ChatroomsPage: React.FC = () => {



	const {
		data: profileData,
		loading: profileLoading,
		error: profileError,
	  } = useFetch<IProfileData[]>({
		url: "//get-chatrooms",
		data: { id: sessionStorage.getItem("id") },
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
						try{
							const fetchedPhoto: IPhotoData = await fetchData<IPhotoData>("/get-photo", photoKey[0]);
							profile.subject.profile_photo = fetchedPhoto; // Update profile photo data
						}
						catch (error){
							console.error("Error fetching phoro",error);
							profile.subject.profile_photo = null;
						}
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
			return <div className="flex justify-center items-center"><Spinner color="success" size="lg"/></div>;
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
	<NotificationProvider>
        <Menu />
      </NotificationProvider>
			<div>
				{ modifiedProfileData && modifiedProfileData.length > 0
					?	
				modifiedProfileData.map((profile) => (
					<ChatroomItem key={profile.name} name={profile.name} subject={profile.subject} last_message={profile.last_message} />
				))
				: 
					<div className=" mx-5 my-56 xl:mx-80 sm:w-[400px] lg:w-[600px] xl:w-[800px] rounded-md text-red-800 bg-red-400 p-2 border-red-800 border-2 text-lg ">
					  No ongoing chats - swipe more for matches!
					</div>}
			</div>
		</div>
	);
	
}
export default ChatroomsPage;

