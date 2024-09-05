import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { skeletonItems } from 'components/CommentsBlock/ui/skeleton';
import { SideBlock } from '../SideBlock';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  List,
} from '@mui/material';
import styles from '../UserInfo/UserInfo.module.scss';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      fullName
      email
      rank
      avatarUrl
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <SideBlock title="Пользователи">
      <List>
        {loading ? (
          skeletonItems
        ) : (
          <>
            {data?.getUsers?.map((user) => (
              <React.Fragment key={user._id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={user?.fullName}
                      src={`${process.env.REACT_APP_API_URL}${user.avatarUrl}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          sx={{
                            display: 'inline',
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {user?.fullName}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <span
                          className={
                            user?.rank === 'user' ? styles.rank : styles.admin
                          }
                        >
                          {user?.rank === 'admin'
                            ? 'Администратор'
                            : 'Пользователь'}
                        </span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </>
        )}
      </List>
    </SideBlock>
  );
};

export default UsersList;
