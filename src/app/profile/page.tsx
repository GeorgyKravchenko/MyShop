'use client';

import { useActions } from '@/hooks/store/useAction';
import { useSetData } from '@/hooks/store/useSetData';
import { useTypedSelector } from '@/hooks/useTypedSelector';
// import { useTypedSelector } from "@/hooks/useTypedSelector"
import { withAuth } from '@/lib/firebase/withAuth';
import { memo, useMemo } from 'react';
import ProfileView from './ProfileView';
import { useSetUser } from '@/hooks/store/useUser';
import SkeletonLoader from '@/components/ui/SkeletonLoader';

const UserProfilePage = () => {
  const orders = useTypedSelector((state) => state.order);
  const user = useTypedSelector((state) => state.user);
  const { setOrders } = useActions();
  const setDataFetchStatus = useSetData(setOrders, 'orders');
  const setDataFetchStatusUser = useSetUser();
  const memoizedOrders = useMemo(() => [...orders].reverse(), [orders]);

  if (setDataFetchStatus === 'pending' || setDataFetchStatusUser === 'pending')
    return <SkeletonLoader />;
  return <ProfileView orders={memoizedOrders} userdata={user} />;
};

export default withAuth(memo(UserProfilePage));
