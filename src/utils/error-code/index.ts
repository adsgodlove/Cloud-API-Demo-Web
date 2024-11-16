export interface ErrorCode {
  code: number;
  msg: string;
}

/**
 * 根据错误码翻译错误信息
 * 参考：https://developer.dji.com/doc/cloud-api-tutorial/cn/error-code.html
 * @param code
 * @param errorMsg
 * @returns
 */
export function getErrorMessage (code: number, errorMsg?: string): string {
  const errorInfo = ERROR_CODE.find((item: ErrorCode) => item.code === code)
  return errorInfo ? errorInfo.msg : errorMsg || 'Server error'
}

// 暂时只添加航线错误
export const ERROR_CODE = [
  {
    code: 314001,
    // msg: 'The issued route task url is empty',
    msg: '下发的路线任务 URL 为空',
  },
  {
    code: 314002,
    // msg: 'The issued route task md5 is empty',
    msg: '下发的路线任务 MD5 为空',
  },
  {
    code: 314003,
    msg: '任务ID无效',
  },
  {
    code: 314004,
    msg: '无法从云端发送飞行路线任务',
  },
  {
    code: 314005,
    msg: '路线 MD5 校验失败',
  },
  {
    code: 314006,
    msg: '等待飞机上传路线超时（等待 gs_state）',
  },
  {
    code: 314007,
    msg: '无法上传路线到飞机',
  },
  {
    code: 314008,
    msg: '等待飞机进入路线可执行状态超时',
  },
  {
    code: 314009,
    msg: '无法打开路线任务',
  },
  {
    code: 314010,
    msg: '航线执行失败',
  },
  {
    code: 316001,
    msg: '设置备用点失败',
  },
  {
    code: 316002,
    msg: '备用安全传输高度设备故障',
  },
  {
    code: 316003,
    msg: '设置起飞高度失败。备注：当前 DJI Dock 设置的飞机默认安全起飞高度为：1.8',
  },
  {
    code: 316004,
    msg: '设置失控行为失败',
  },
  {
    code: 316005,
    msg: '飞机RTK收敛失败',
  },
  {
    code: 316013,
    msg: 'DJI Dock已移动',
  },
  {
    code: 316015,
    msg: '飞机RTK收敛位置距离DJI Dock太远',
  },
  {
    code: 316007,
    msg: '等待飞机准备就绪时设置参数超时',
  },
  {
    code: 316008,
    msg: '获取飞机控制权失败',
  },
  {
    code: 316009,
    msg: '飞机电量低',
  },
  {
    code: 316010,
    msg: '开机后，飞机超过2分钟未连接（飞控OSD接收超时）',
  },
  {
    code: 316011,
    msg: '降落位置偏移',
  },
  {
    code: 317001,
    msg: '获取媒体文件数量失败',
  },
  {
    code: 319001,
    msg: '任务中心当前不空闲',
  },
  {
    code: 319002,
    msg: 'dronenest通信超时',
  },
  {
    code: 319999,
    msg: '未知错误，例如崩溃后重启',
  },
  {
    code: 321000,
    msg: '航线执行失败，未知错误',
  },
  {
    code: 321257,
    msg: '航线已启动，无法再次启动',
  },
  {
    code: 321258,
    msg: '在此状态下无法中断航线',
  },
  {
    code: 321259,
    msg: '航线未启动，无法结束航线',
  },
  {
    code: 321513,
    msg: '达到高度限制',
  },
  {
    code: 321514,
    msg: '达到限制',
  },
  {
    code: 321515,
    msg: '穿越禁飞区',
  },
  {
    code: 321516,
    msg: '低限制',
  },
  {
    code: 321517,
    msg: '避障',
  },
  {
    code: 321769,
    msg: 'GPS信号弱',
  },
  {
    code: 321770,
    msg: '当前档位状态无法执行，B控制抢占控制，档位切换',
  },
  {
    code: 321771,
    msg: '未刷新返航点',
  },
  {
    code: 321772,
    msg: '当前电池电量过低，无法启动任务',
  },
  {
    code: 321773,
    msg: '低电量返航',
  },
  {
    code: 321776,
    msg: 'RTK未准备好',
  },
  {
    code: 321778,
    msg: '飞机在地面空转，不允许启动航线，认为用户未准备好。',
  },
  {
    code: 322282,
    msg: '用户中断（B控制接管）',
  },
  {
    code: 514100,
    msg: '命令不支持',
  },
  {
    code: 514101,
    msg: '关闭推杆失败',
  },
  {
    code: 514102,
    msg: '释放推杆失败',
  },
  {
    code: 514103,
    msg: '飞机电池电量低',
  },
  {
    code: 514104,
    msg: '启动充电失败',
  },
  {
    code: 514105,
    msg: '停止充电失败',
  },
  {
    code: 514106,
    msg: '重启飞机失败',
  },
  {
    code: 514107,
    msg: '打开舱门失败',
  },
  {
    code: 514108,
    msg: '关闭舱门失败',
  },
  {
    code: 514109,
    msg: '打开飞机失败',
  },
  {
    code: 514110,
    msg: '关闭飞机失败',
  },
  {
    code: 514111,
    msg: '飞机在舱内启动缓慢旋转螺旋桨失败',
  },
  {
    code: 514112,
    msg: '飞机在舱内停止缓慢旋转螺旋桨失败',
  },
  {
    code: 514113,
    msg: '与飞机建立有线连接失败',
  },
  {
    code: 514114,
    msg: '获取飞机电源状态，命令超时或返回码不是0',
  },
  {
    code: 514116,
    msg: 'DJI Dock忙，正在执行其他控制命令',
  },
  {
    code: 514117,
    msg: '检查舱门状态失败',
  },
  {
    code: 514118,
    msg: '检查推杆状态失败',
  },
  {
    code: 514120,
    msg: 'DJI Dock与飞机SDR连接失败',
  },
  {
    code: 514121,
    msg: '紧急停止状态',
  },
  {
    code: 514122,
    msg: '获取飞机充电状态失败（获取充电状态失败，飞行任务可执行，但影响充电和远程故障排除）',
  },
  {
    code: 514123,
    msg: '电池电量低，无法开机',
  },
  {
    code: 514124,
    msg: '获取电池信息失败',
  },
  {
    code: 514125,
    msg: '电池已充满，无法充电',
  },
  {
    code: 514145,
    msg: '现场调试时无法工作',
  },
  {
    code: 514146,
    msg: '远程调试时无法工作',
  },
  {
    code: 514147,
    msg: '升级状态中无法工作',
  },
  {
    code: 514148,
    msg: '工作状态中无法执行新任务',
  },
  {
    code: 514150,
    msg: 'DJI Dock正在自动重启',
  },
]
