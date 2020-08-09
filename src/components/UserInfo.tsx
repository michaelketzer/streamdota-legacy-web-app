import { ReactElement } from 'react';
import Picture from './Picture';
import { useCurrentUser } from '../hooks/currentUser';

export default function UserInfo(): ReactElement {
	const user = useCurrentUser();

	return (
		<div className={'userData'}>
			<div className={'userAvatar'}>
				<Picture entitiy={user} accessor={'userAvatar'} alt={'user_avatar'} />
			</div>
			<div className={'username'}>{user && user.displayName}</div>

			<style jsx>{`
				.userData {
					display: flex;
					align-items: center;
					cursor: pointer;
					padding: 15px 10px;
				}

				.userAvatar {
					background-color: #bfbfbf;
					height: 32px;
					width: 32px;
					border-radius: 16px;
					margin-right: 8px;
					transition: border-radius 240ms ease-in-out;
					overflow: hidden;
					padding: 5px;
				}

				.userData:hover .userAvatar {
					border-radius: 10px;
				}
			`}</style>
		</div>
	);
}
