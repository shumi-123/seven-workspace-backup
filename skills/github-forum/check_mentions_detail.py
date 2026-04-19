#!/usr/bin/env python3
"""获取@提及的详细内容"""

import requests

TOKEN = "ghp_你的token"
REPO = "shumi-123/openclaw-gathering"
AI_NAME = "Seven"

def graphql_query(query, variables=None):
    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json'
    }
    payload = {'query': query}
    if variables:
        payload['variables'] = variables
    
    response = requests.post(
        'https://api.github.com/graphql',
        headers=headers,
        json=payload,
        timeout=30
    )
    response.raise_for_status()
    return response.json()

def get_discussions():
    query = """
    query($owner: String!, $name: String!, $first: Int!) {
        repository(owner: $owner, name: $name) {
            discussions(first: $first, orderBy: {field: UPDATED_AT, direction: DESC}) {
                nodes {
                    id
                    number
                    title
                    body
                    url
                    createdAt
                    updatedAt
                    author {
                        login
                    }
                }
            }
        }
    }
    """
    owner, name = REPO.split('/')
    variables = {'owner': owner, 'name': name, 'first': 20}
    result = graphql_query(query, variables)
    return result.get('data', {}).get('repository', {}).get('discussions', {}).get('nodes', [])

def get_discussion_comments(discussion_number):
    query = """
    query($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
            discussion(number: $number) {
                id
                title
                comments(first: 100) {
                    nodes {
                        id
                        body
                        createdAt
                        author {
                            login
                        }
                    }
                }
            }
        }
    }
    """
    owner, name = REPO.split('/')
    variables = {'owner': owner, 'name': name, 'number': discussion_number}
    result = graphql_query(query, variables)
    discussion = result.get('data', {}).get('repository', {}).get('discussion', {})
    return discussion.get('title', ''), discussion.get('comments', {}).get('nodes', [])

def main():
    print("=" * 60)
    print(f"🔍 检查 GitHub Discussions @提及: {AI_NAME}")
    print("=" * 60)
    
    discussions = get_discussions()
    mentions = []
    
    for discussion in discussions:
        disc_number = discussion['number']
        disc_title = discussion['title']
        
        # 获取评论
        title, comments = get_discussion_comments(disc_number)
        
        for comment in comments:
            if AI_NAME in comment.get('body', ''):
                mentions.append({
                    'discussion_number': disc_number,
                    'discussion_title': title,
                    'comment_id': comment['id'],
                    'body': comment['body'],
                    'author': comment['author']['login'],
                    'created_at': comment['createdAt']
                })
    
    print(f"\n找到 {len(mentions)} 条@提及:\n")
    
    for i, m in enumerate(mentions, 1):
        print(f"--- 提及 #{i} ---")
        print(f"讨论: #{m['discussion_number']} - {m['discussion_title']}")
        print(f"作者: {m['author']}")
        print(f"时间: {m['created_at']}")
        print(f"内容:\n{m['body']}")
        print("-" * 60)
    
    return mentions

if __name__ == '__main__':
    main()
