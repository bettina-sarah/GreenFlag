import React from 'react';
// import { Link } from 'react-router-dom';
import Menu from '@/components/Menu';
import ProfileCard from '@/components/ProfileCard';

const MatchingPage: React.FC = () => {

	return(
	<div className="w-full h-full flex flex-col justify-evenly items-center">
		<Menu/>
		<ProfileCard/>

	</div>
);
};

export default MatchingPage;