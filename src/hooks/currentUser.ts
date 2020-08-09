import { User } from '@streamdota/shared-types';
import { useSelector, useDispatch } from 'react-redux';
import { currentUserSelector } from '../modules/selector/Ui';
import { useEffect } from 'react';
import { loadCurrentUser } from '../modules/reducer/Ui';

export function useCurrentUser(auth?: string): User | null {
	const user = useSelector(currentUserSelector);
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (!user) {
				dispatch(loadCurrentUser(auth));
			}
		},
		[ auth, user ]
	);

	return user;
}
