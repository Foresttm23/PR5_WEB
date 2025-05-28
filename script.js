document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("button__first")
    .addEventListener("click", function () {
      const task1 = allIds();

      const OmegaSum =
        task1("PL110KVOmega") * 10 +
        task1("T110KVOmega") +
        task1("V110KVOmega") +
        task1("V10KVOmega") +
        6 * task1("tiresOmega");

      const tvos =
        (task1("PL110KVTvi") * task1("PL110KVOmega") +
          task1("T110KVTvi") * task1("T110KVOmega") +
          task1("V110KVTvi") * task1("V110KVOmega") +
          task1("V10KVTvi") * task1("V10KVOmega") +
          task1("tiresTvi") * 6 * task1("tiresOmega")) /
        OmegaSum;

      const kaos = (OmegaSum * tvos) / 8760;
      const kpos = 1.2 * (task1("PlannedKMax") / 8760);
      const DKOmega = 2 * OmegaSum * (kaos + kpos);
      const DSOmega = DKOmega + task1("V10KVOmega");

      document.getElementById("OmegaSum").textContent = OmegaSum.toFixed(2);
      document.getElementById("tvos").textContent = tvos.toFixed(2);
      document.getElementById("kaos").textContent = (kaos * 1e4).toFixed(2);
      document.getElementById("kpos").textContent = (kpos * 1e4).toFixed(2);
      document.getElementById("DKOmega").textContent = (DKOmega * 1e4).toFixed(
        2
      );
      document.getElementById("DSOmega").textContent = DSOmega.toFixed(2);
    });

  document
    .getElementById("button__second")
    .addEventListener("click", function () {
      const task2 = allIds();

      const Wneda = task2("Omega") * task2("tv") * task2("Pm") * task2("Tm");
      const Wnedp = task2("kp") * task2("Pm") * task2("Tm");
      const Zper = task2("ZperA") * Wneda + task2("ZperP") * Wnedp;

      document.getElementById("Wneda").textContent = Wneda.toFixed(2);
      document.getElementById("Wnedp").textContent = Wnedp.toFixed(2);
      document.getElementById("Zper").textContent = Zper.toFixed(2);
    });
});

function allIds() {
  const task = (id) => {
    const element = document.getElementById(id);
    if (!element) {
      return 0;
    }
    return parseFloat(element.value);
  };

  return task;
}
