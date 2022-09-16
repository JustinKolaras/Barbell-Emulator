addEventListener("DOMContentLoaded", () => {
    const bbImage = "assets/barbell.png";
    const plateImages = { 25: "assets/25kg.png", 20: "assets/20kg.png" };

    document.getElementById("emulate").onclick = function () {
        const totalWeight = parseInt(document.getElementById("kg").value);
        const barbellWeight = parseInt(document.getElementById("bb_weight").value);

        let workingWeight = totalWeight - barbellWeight;

        // Calculate
        let combinations = { 25: 0, 20: 0, 15: 0, 10: 0, 5: 0, 2.5: 0, 1.25: 0, 0.5: 0, 0.25: 0 };
        let sortedKeyCombinations = Object.keys(combinations).sort((a, b) => b - a);
        for (plateWeight of sortedKeyCombinations) {
            // In error.
            // The following division calculation needs to return a number, which:
            // a) is even, and
            // b) is whole.
            // Otherwise, do as best as we can, and take the remainder of the number and substitute it to be
            // made up for in smaller weight plates.
            // This is a considerable problem to solve.
            const num = workingWeight / plateWeight;
            combinations[plateWeight] = num;
            workingWeight = workingWeight - num * plateWeight;
        }

        // Emulate
        let placements = [];
        for (plate of sortedKeyCombinations.filter((k) => combinations[k] > 0)) {
            for (let i = 0; i < combinations[plate]; i++) {
                placements.push(plateImages[plate]);
            }
        }

        placements.splice(placements.length / 2, 0, bbImage);

        placements = placements.map((el) => {
            const node = document.createElement("img");
            node.src = el;

            if (node.src.includes("barbell")) {
                node.setAttribute("class", "barbell");
            }

            return node;
        });

        for (place of placements) {
            document.getElementById("emulation").appendChild(place);
        }
    };
});
