CREATE VIEW [dbo].[OperatorInputView]
AS
SELECT 
    oi.OperatorInputId,
    oi.ModelId,
    ISNULL(m.Name, '') AS ModelName,
    dst.StartTime AS DowntimeStartTime,
    det.EndTime AS DowntimeEndTime,
    CONCAT(
        FORMAT(DATEDIFF(MINUTE, dst.StartTime, det.EndTime), 'D2'), 
        ' Min'
    ) AS TotalDowntime,
    oi.DowntimeTypeId,
    dt.TypeName AS DowntimeTypeName,
    oi.DowntimeReasonId,
    dr.ReasonText AS DowntimeReasonText,
    oi.Details,
    oi.MachineId,
    ISNULL(s.Name, '') AS MachineName,
    oi.UserId,
    u.Username AS UserName
FROM OperatorInputs oi
INNER JOIN Models m ON oi.ModelId = m.ModelId
INNER JOIN DowntimeTypes dt ON oi.DowntimeTypeId = dt.DowntimeTypeId
INNER JOIN DowntimeReasons dr ON oi.DowntimeReasonId = dr.DowntimeReasonId
INNER JOIN MachineInformations mi ON oi.MachineId = mi.MachineId
INNER JOIN Stations s ON mi.StationId = s.StationId
INNER JOIN Users u ON oi.UserId = u.UserId
INNER JOIN DowntimeStartTimes dst ON oi.StartTimeId = dst.StartTimeId
INNER JOIN DowntimeEndTimes det ON oi.EndTimeId = det.EndTimeId;