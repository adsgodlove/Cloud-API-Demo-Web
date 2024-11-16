import { commonColor } from '/@/utils/color'

// 任务类型
export enum TaskType {
  Immediate = 0, // 立即执行
  Timed = 1, // 单次定时任务
  Condition = 2,
}

export const TaskTypeMap = {
  [TaskType.Immediate]: 'Immediate',
  [TaskType.Timed]: 'Timed',
  [TaskType.Condition]: 'Continuous',
}

export const TaskTypeOptions = [
  { value: TaskType.Immediate, label: '立即' },
  { value: TaskType.Timed, label: '定时' },
  { value: TaskType.Condition, label: '条件' },
]

// 失控动作
export enum OutOfControlAction {
  ReturnToHome = 0,
  Hover = 1,
  Land = 2,
}

export const OutOfControlActionMap = {
  [OutOfControlAction.ReturnToHome]: '返航',
  [OutOfControlAction.Hover]: '悬停',
  [OutOfControlAction.Land]: '降落',
}

export const OutOfControlActionOptions = [
  { value: OutOfControlAction.ReturnToHome, label: OutOfControlActionMap[OutOfControlAction.ReturnToHome] },
  { value: OutOfControlAction.Hover, label: OutOfControlActionMap[OutOfControlAction.Hover] },
  { value: OutOfControlAction.Land, label: OutOfControlActionMap[OutOfControlAction.Land] },
]

// 任务状态
export enum TaskStatus {
  Wait = 1, //  待执行
  Carrying = 2, // 执行中
  Success = 3, // 完成
  CanCel = 4, // 取消
  Fail = 5, // 失败
  Paused = 6, // 暂停
}

export const TaskStatusMap = {
  [TaskStatus.Wait]: '待执行',
  [TaskStatus.Carrying]: '进行中',
  [TaskStatus.Success]: '任务完成',
  [TaskStatus.CanCel]: '任务取消',
  [TaskStatus.Fail]: '任务失败',
  [TaskStatus.Paused]: '暂停',
}

export const TaskStatusColor = {
  [TaskStatus.Wait]: commonColor.BLUE,
  [TaskStatus.Carrying]: commonColor.BLUE,
  [TaskStatus.Success]: commonColor.NORMAL,
  [TaskStatus.CanCel]: commonColor.FAIL,
  [TaskStatus.Fail]: commonColor.FAIL,
  [TaskStatus.Paused]: commonColor.BLUE,
}

// 任务执行 ws 消息状态
export enum TaskProgressStatus {
  Sent = 'sent', // 已下发
  inProgress = 'in_progress', // 执行中
  Paused = 'paused', // 暂停
  Rejected = 'rejected', // 拒绝
  Canceled = 'canceled', // 取消或终止
  Timeout = 'timeout', // 超时
  Failed = 'failed', // 失败
  OK = 'ok', // 上传成功
}

// 任务进度消息
export interface TaskProgressInfo {
  bid: string,
  output:{
    ext: {
      current_waypoint_index: number,
      media_count: number // 媒体文件
    },
    progress:{
      current_step: number,
      percent: number
    },
    status: TaskProgressStatus
  },
  result: number,
}

// ws status => log status
export const TaskProgressWsStatusMap = {
  [TaskProgressStatus.Sent]: TaskStatus.Carrying,
  [TaskProgressStatus.inProgress]: TaskStatus.Carrying,
  [TaskProgressStatus.Rejected]: TaskStatus.Fail,
  [TaskProgressStatus.OK]: TaskStatus.Success,
  [TaskProgressStatus.Failed]: TaskStatus.Fail,
  [TaskProgressStatus.Canceled]: TaskStatus.CanCel,
  [TaskProgressStatus.Timeout]: TaskStatus.Fail,
  [TaskProgressStatus.Paused]: TaskStatus.Paused,
}

// 根据媒体文件上传进度信息，前端自己判断出的状态
export enum MediaStatus { // 媒体上传进度
  ToUpload = 1, // 待上传
  Uploading = 2, // 上传中
  Empty = 3, // 无媒体文件
  Success = 4, // 上传成功
}

export const MediaStatusMap = {
  [MediaStatus.ToUpload]: '等待上传',
  [MediaStatus.Uploading]: '正在上传…',
  [MediaStatus.Success]: '上传完成',
  [MediaStatus.Empty]: '没有媒体文件',
}

export const MediaStatusColorMap = {
  [MediaStatus.ToUpload]: commonColor.BLUE,
  [MediaStatus.Uploading]: commonColor.BLUE,
  [MediaStatus.Success]: commonColor.NORMAL,
  [MediaStatus.Empty]: commonColor.WARN,
}

// 媒体上传进度消息
export interface MediaStatusProgressInfo {
  job_id: string,
  media_count: number
  uploaded_count: number,
}

// 媒体上传优先级消息
export interface TaskMediaHighestPriorityProgressInfo {
  pre_job_id: string,
  job_id: string,
}
