import { ReactElement } from 'react';
import Category from './Category';
import { useCurrentUser } from '../../../../hooks/currentUser';

export default function Tab(): ReactElement | null {
	const user = useCurrentUser();

	if (user) {
		return <Category user={user} />;
	}

	return null;
}
