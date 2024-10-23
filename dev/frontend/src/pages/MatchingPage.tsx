import React from 'react';
// import { Link } from 'react-router-dom';
import Menu from '@/components/Menu';
import ProfileCard from '@/components/ProfileCard';

const MatchingPage: React.FC = () => (
	<div bg-green-300>
		<Menu/>
		<ProfileCard/>

		<h1>MatchingPage</h1>

	</div>
);

export default MatchingPage;