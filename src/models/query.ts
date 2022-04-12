const CHECK_USERNAME = `
  select username from users where username = $1
`;

const SIGNUP = `
  insert into users (firstname, lastname, password, username) values ($1, $2, crypt($3, gen_salt('bf')), $4) returning *;
`;

const LOGIN = `
  select
    *
  from
   users
  where
    username = $1 and password = crypt($2, password)
`;

const NEW_CONVERSATION = ` insert into conversations (sender_id, receiver_id) values ($1, $2) returning *;`;

const GET_CONVERSATION = `select * from conversations where receiver_id = $1`;

const USERS_MESSAGES = `
    select u.user_id, u.user_name, u.user_email, u.is_active, count(m.author_id) from users as u left join messages as m on u.user_id = m.author_id where m.user_id = $1 and m.is_read = false group by m.author_id, u.user_id
`;

const GET_MESSAGES = `select message_id, content, is_read, sender_id, conversation_id, to_char(created_at,'HH12:MI') as date from messages where conversation_id = $1`;

const READ_MESSAGE = `
    update messages set is_read = true where sender_id = $1 and message_id = $2
`;

const NEW_MESSAGE = `insert into messages (content, sender_id, conversation_id) valus ($1, $2, $3)`;
const GET_USER = `select * from users where id = $1`;

export default {
  CHECK_USERNAME,
  SIGNUP,
  LOGIN,
  NEW_CONVERSATION,
  GET_CONVERSATION,
  USERS_MESSAGES,
  GET_MESSAGES,
  READ_MESSAGE,
  NEW_MESSAGE,
  GET_USER,
};
