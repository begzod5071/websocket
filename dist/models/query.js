"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CHECK_USERNAME = "\n  select username from users where username = $1\n";
var SIGNUP = "\n  insert into users (firstname, lastname, password, username) values ($1, $2, crypt($3, gen_salt('bf')), $4) returning *;\n";
var LOGIN = "\n  select\n    *\n  from\n   users\n  where\n    username = $1 and password = crypt($2, password)\n";
var NEW_CONVERSATION = " insert into conversations (sender_id, receiver_id) values ($1, $2) returning *;";
var GET_CONVERSATION = "select * from conversations where receiver_id = $1";
var USERS_MESSAGES = "\n    select u.user_id, u.user_name, u.user_email, u.is_active, count(m.author_id) from users as u left join messages as m on u.user_id = m.author_id where m.user_id = $1 and m.is_read = false group by m.author_id, u.user_id\n";
var GET_MESSAGES = "select message_id, content, is_read, sender_id, conversation_id, to_char(created_at,'HH12:MI') as date from messages where conversation_id = $1";
var READ_MESSAGE = "\n    update messages set is_read = true where sender_id = $1 and message_id = $2\n";
var NEW_MESSAGE = "insert into messages (content, sender_id, conversation_id) valus ($1, $2, $3)";
var GET_USER = "select * from users where id = $1";
exports.default = {
    CHECK_USERNAME: CHECK_USERNAME,
    SIGNUP: SIGNUP,
    LOGIN: LOGIN,
    NEW_CONVERSATION: NEW_CONVERSATION,
    GET_CONVERSATION: GET_CONVERSATION,
    USERS_MESSAGES: USERS_MESSAGES,
    GET_MESSAGES: GET_MESSAGES,
    READ_MESSAGE: READ_MESSAGE,
    NEW_MESSAGE: NEW_MESSAGE,
    GET_USER: GET_USER,
};
