import FoodNutrient from '../models/FoodNutrient.js';

export const getFoodNutrients = async (req, res) => {
  const { foodId } = req.params; // ID för livsmedlet

  try {
    // Hämta alla näringsvärden för ett specifikt livsmedel
    const nutrients = await FoodNutrient.findAll({
      where: { livsmedel_id: foodId },
    });

    res.json(nutrients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nutrients', error });
  }
};
