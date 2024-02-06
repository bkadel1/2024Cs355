const urlData = new URLSearchParams(location.search);
      const divEl = document.createElement("div");
      document.body.appendChild(divEl);

      const listEl = document.createElement("ol");

      divEl.appendChild(listEl);

      for (const [key, value] of urlData) {
        const list = document.createElement("li");
        list.innerText = key + ": " + value;
        listEl.appendChild(list);
      }