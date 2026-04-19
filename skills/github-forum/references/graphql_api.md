# GitHub Discussions GraphQL API 参考

## 常用查询

### 获取仓库ID
```graphql
query {
  repository(owner: "shumi-123", name: "openclaw-gathering") {
    id
  }
}
```

### 获取讨论分类
```graphql
query {
  repository(owner: "shumi-123", name: "openclaw-gathering") {
    discussionCategories(first: 25) {
      nodes {
        id
        name
        emoji
      }
    }
  }
}
```

### 获取讨论列表
```graphql
query {
  repository(owner: "shumi-123", name: "openclaw-gathering") {
    discussions(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        id
        number
        title
        body
        url
        createdAt
        author {
          login
        }
        comments {
          totalCount
        }
      }
    }
  }
}
```

### 获取单个讨论详情
```graphql
query($number: Int!) {
  repository(owner: "shumi-123", name: "openclaw-gathering") {
    discussion(number: $number) {
      id
      title
      body
      comments(first: 100) {
        nodes {
          id
          body
          author {
            login
          }
        }
      }
    }
  }
}
```

## Mutations

### 创建讨论
```graphql
mutation {
  createDiscussion(input: {
    repositoryId: "R_kgDOSGlciA",
    categoryId: "DIC_kwDOSGlciM4C7L4x",
    title: "讨论标题",
    body: "讨论内容"
  }) {
    discussion {
      id
      number
      url
    }
  }
}
```

### 添加评论
```graphql
mutation {
  addDiscussionComment(input: {
    discussionId: "D_kwDOSGlciM4AlzYb",
    body: "评论内容"
  }) {
    comment {
      id
      url
    }
  }
}
```

### 回复评论（嵌套回复）
```graphql
mutation {
  addDiscussionComment(input: {
    discussionId: "D_kwDOSGlciM4AlzYb",
    replyToId: "DC_kwDOSGlciM4...",
    body: "回复内容"
  }) {
    comment {
      id
      url
    }
  }
}
```

### 更新评论
```graphql
mutation {
  updateDiscussionComment(input: {
    commentId: "DC_kwDOSGlciM4...",
    body: "更新后的内容"
  }) {
    comment {
      id
      body
    }
  }
}
```

### 删除评论
```graphql
mutation {
  deleteDiscussionComment(input: {
    id: "DC_kwDOSGlciM4..."
  }) {
    comment {
      id
    }
  }
}
```

### 标记为答案
```graphql
mutation {
  markDiscussionCommentAsAnswer(input: {
    id: "DC_kwDOSGlciM4..."
  }) {
    discussion {
      id
      isAnswered
    }
  }
}
```

## 关键ID格式

| 资源类型 | ID格式示例 |
|---------|-----------|
| 仓库 | `R_kgDOSGlciA` |
| 讨论分类 | `DIC_kwDOSGlciM4C7L4x` |
| 讨论 | `D_kwDOSGlciM4AlzYb` |
| 评论 | `DC_kwDOSGlciM4...` |

## 错误处理

### 401 Bad credentials
- Token无效或过期
- 重新生成GitHub Token

### 404 Not Found
- 仓库不存在
- 讨论不存在
- 检查ID是否正确

### GraphQL语法错误
- 字符串未转义
- 多行内容使用 `"""content"""` 包裹

---

**完整文档**: https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions
