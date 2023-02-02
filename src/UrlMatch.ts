/**
 * 完全匹配URL模式
 */
export type UrlAbsoluteMatch = string

/**
 * 正则匹配URL模式
 */
export type UrlRegexMatch = RegExp

/**
 * 回调匹配URL模式
 */
export type UrlCallbackMatch = (url: string) => boolean

/**
 * URL匹配模式
 */
export type UrlMatch = UrlAbsoluteMatch | UrlRegexMatch | UrlCallbackMatch
