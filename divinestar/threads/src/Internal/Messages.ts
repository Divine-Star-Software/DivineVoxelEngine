export const TCMessageHeaders = Object.freeze({
	internal: -99,
});

export const TCInternalMessages = {
	IsReady: -99,
	nameThread: -98,
	connectPort: -97,
	syncQueue: -96,
	unSyncQueue: -95,
	completeTasks: -94,
	checkTasksResult: -93,
	runTasks: -98,
	checkTasks: -97,
	message: -95,
	SyncData: -990,
	UnSyncData: -980,
};

let start = -1_000;
for (const key in TCInternalMessages) {
	TCInternalMessages[key as keyof typeof TCInternalMessages] = start;
	start += 1;
}

