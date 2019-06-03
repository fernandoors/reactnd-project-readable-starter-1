import React from 'react'
import { Icon, Card, Popover } from 'antd';
import { formatDate, capitalize } from '../services/utils';
import { Link } from 'react-router-dom'

export default function CardView(props) {
  return (
    <Card
      title={props.post.title}
      key={props.post.id}
      style={{ width: '400px', margin: '15px 0' }}
    >
      {props.post.body}
      <br />
      <Icon type='user' /> Author: {props.post.author}
      {props.post.category &&
        <label>
          | <Icon type='align-left' />
          <label>Category: 
            <Link to={`/${props.post.category}`}>
               {capitalize(props.post.category)}
            </Link>
          </label>
        </label>
      }
      <br />
      {formatDate(props.post.timestamp)}
      <br />
      <Popover mouseEnterDelay={0.5} content='Edit' trigger="hover">
        <a href='#edit'>
          <Icon type="edit" className='iconStyle'
            onClick={() => {
              if (!!props.handleEditPost) props.handleEditPost(props.post)
              else props.handleEditComment(props.post)
            }}
          />
        </a>
      </Popover>
      {props.post.commentCount >= 0
        && <label>
          <Popover mouseEnterDelay={0.5} content='Comments' trigger="hover">
            <Link to={`/${props.post.category}/${props.post.id}`}>
              <Icon type="message" className='iconStyle' onClick={() => props.collectComments(props.post.id)} />
            </Link>
          </Popover>
          ({props.post.commentCount})
        </label>}
      <Popover mouseEnterDelay={0.5} content='Vote Up' trigger="hover">
        <Icon type="like" className='iconStyle' onClick={() => props.setVote(props.post.id, 'upVote')} />
      </Popover>
      <Popover mouseEnterDelay={0.5} content='Vote Down' trigger="hover">
        <Icon type="dislike" className='iconStyle' onClick={() => props.setVote(props.post.id, 'downVote')} />
      </Popover>
      ({props.post.voteScore})
      <Popover mouseEnterDelay={0.5} content='Delete' trigger="hover">
        <Icon type="delete" className='iconStyle' style={{ color: 'red' }} onClick={() => props.handleDeleteModal(!props.post.title ? props.post.body : props.post.title, props.post.id)} />
      </Popover>

    </Card>
  )
}