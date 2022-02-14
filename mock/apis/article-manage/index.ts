import { baseUrl } from '../common';

export default {
  /** 获取所有文章 */
  fetchAllArticle: `${baseUrl}/articles`,
  /** 获取文章创作者信息 */
  fetchAuthorInfoById: `${baseUrl}/authors`,
  /** 获取创作者所有文章 */
  fetchArticlesById: `${baseUrl}/articles`,
  /** 根据id删除文章 */
  deleteArticleById: `${baseUrl}/articles`,
  /** 根据文章id查询文章详情 */
  fetchArticleDetailById: `${baseUrl}/articles`,
  /** 更新或者新增文章 */
  updateArticle: `${baseUrl}/articles`,
};
