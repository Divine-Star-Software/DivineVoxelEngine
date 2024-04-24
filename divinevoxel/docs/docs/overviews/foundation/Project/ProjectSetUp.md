---
id: "index"
title: "Set Up"
sidebar_label: "Set Up"
sidebar_position: 0
custom_edit_url: null
---

Assuming you have everything installed and ready to go the following will show how to set up a default react project.

First set up your app like this:

```console
- src
  App.tsx
 - Contexts
   - Constructor 
     - index.ts
   - World
    - index.ts
   - Nexus (optional)
    - index.ts
   - RichWorld (optional)
    - index.ts
   - DataLoader (optinal)
    - index.ts
```

On the top of App.tsx you can import all the workers you will be using. 
Please note that you can supply an array of workers for the Constructor thread. 
This is because it acts as a thread pool. 
Here in this example it is making an array of workers based on the number of threads the device has.

```ts
const worldWorker = new Worker(new URL("./Contexts/World/", import.meta.url), {
  type: "module",
});
const nexusWorker = new Worker(new URL("./Contexts/Nexus", import.meta.url), {
  type: "module",
});
const constructorWorkers: Worker[] = [];
for (let i = 0; i < navigator.hardwareConcurrency - 1; i++) {
  constructorWorkers.push(
    new Worker(new URL("./Contexts/Constructor/", import.meta.url), {
      type: "module",
    })
  );
}
```

The next steps depends on what renderer you are going to use. 


